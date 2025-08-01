import React from 'react'
import { View, Text, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { increment, decrement } from './counterSlice'

const Counter = () => {
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
            <Text style={{ fontSize: 24 }}>Count: {count}</Text>
            <Button title="+" onPress={() => dispatch(increment())} />
            <Button title="-" onPress={() => dispatch(decrement())} />
        </View>
    )
}

export default Counter
