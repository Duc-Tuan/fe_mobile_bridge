export interface Candle {
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export const timeframeMap: Record<string, number> = {
    M1: 60,               // 1 phút
    M5: 5 * 60,           // 5 phút
    M15: 15 * 60,
    M30: 30 * 60,
    H1: 60 * 60,          // 1 giờ
    H4: 4 * 60 * 60,
    D1: 24 * 60 * 60,     // 1 ngày
    W1: 7 * 24 * 60 * 60, // 1 tuần
    MN: 30 * 24 * 60 * 60 // Giả định 30 ngày cho tháng
};

function getTimeBucket(timestamp: number, tfMinutes: number): number {
    return Math.floor((timestamp) / (tfMinutes)) * (tfMinutes);
}

export async function loadCandles(timeframe: string, data: Candle[]): Promise<Candle[]> {
    const tfMinutes = timeframeMap[timeframe];
    if (!tfMinutes) throw new Error(`Unsupported timeframe: ${timeframe}`);

    // Nếu là M1 thì trả về luôn
    if (tfMinutes === 1) {
        return data as Candle[];
    }

    // Aggregate từ M1 → tf
    const buckets = new Map<number, Candle>();

    for (const candle of data as Candle[]) {
        const bucketTime = getTimeBucket(candle.timestamp, tfMinutes);

        if (!buckets.has(bucketTime)) {
            buckets.set(bucketTime, {
                timestamp: bucketTime,
                open: candle.open,
                high: candle.high,
                low: candle.low,
                close: candle.close,
                volume: candle.volume,
            });
        } else {
            const bucket = buckets.get(bucketTime)!;
            bucket.high = Math.max(bucket.high, candle.high);
            bucket.low = Math.min(bucket.low, candle.low);
            bucket.close = candle.close; // cập nhật close cuối cùng
            bucket.volume += candle.volume;
        }
    }

    // Trả về array đã sắp xếp
    return Array.from(buckets.values()).sort((a, b) => a.timestamp - b.timestamp);
}

export const ReloadCandles = async (timeframe: string, data: Candle[], offset = 0, limit = 100): Promise<Candle[]> => {
    // Mô phỏng load từ offset, ví dụ slice dữ liệu hoặc API thực tế
    return data.slice(Math.max(0, data.length - offset - limit), data.length - offset);
};