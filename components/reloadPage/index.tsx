import React, { useCallback, useState } from 'react';
import { ScrollView, RefreshControl, Text, ActivityIndicator } from 'react-native';
import { View } from '../Themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


interface IProps {
    onRefresh: () => void;
    refreshing: boolean;
    children: React.ReactNode;
}

export default function PullToRefreshScreen(props: IProps) {
    const { onRefresh, refreshing, children } = props;
    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#00ff00']}
                    tintColor="#fb2c3689"
                    progressBackgroundColor="#ffff00" />
            }
        >
            {children}
        </ScrollView>
    );
}
