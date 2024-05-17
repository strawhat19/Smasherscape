import { useState } from "react";
import { Stack, Slider } from "@mui/material";

interface RangeSliderProps {
    min: number;
    max: number;
    name?: string;
    step?: number;
    marks: boolean;
    setAmount: any;
    showMinMax: boolean;
    defaultValue: number;
}

export default function RangeSlider(props: RangeSliderProps) {
    let { min, max, name, marks, setAmount, showMinMax, defaultValue } = props;
    let [value, setValue] = useState<number>(defaultValue);

    const adjustValue = (val) => {
        setValue(val as number);
        setAmount(val as number);
    }

    return (
        <div className={`rangeContainer bgGrad`}>           
            <div className={`bgGradInner`}>
                {name ? <>
                    {name}: {value}
                </> : <></>}
                <Stack className={`rangeSliderContainer`} spacing={2} direction={`row`} alignItems={`center`}>
                    {showMinMax ? min : <></>}
                    <Slider
                        min={min}
                        max={max}
                        marks={marks}
                        size={`small`}
                        color={`secondary`}
                        aria-label={`Range`}
                        // valueLabelDisplay={`auto`}
                        defaultValue={defaultValue}
                        onChange={(_, value) => adjustValue(value)}
                    />
                    {showMinMax ? max : <></>}
                </Stack>
            </div>
        </div>
    )
}