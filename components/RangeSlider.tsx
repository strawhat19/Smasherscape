import { useContext } from "react";
import { StateContext } from "../pages/_app";
import { Stack, Slider } from "@mui/material";

interface RangeSliderProps {
    min: number;
    max: number;
    name: string;
    defaultValue: number;
    step?: number;
    marks?: boolean;
    setAmount?: any;
    showName?: boolean;
    showMinMax?: boolean;
    contextText?: string;
}

export default function RangeSlider(props: RangeSliderProps) {
    let { min, max, name, defaultValue, contextText } = props;
    let { amount, setAmount } = useContext<any>(StateContext);

    return (
        <div className={`rangeContainer bgGrad`}>           
            <div className={`bgGradInner`}>
                {name ? <>
                    {name}: {amount.toLocaleString()}{contextText ? contextText : <></>}
                </> : <></>}
                <Stack className={`rangeSliderContainer`} direction={`row`} alignItems={`center`}>
                    <div style={{ maxWidth: `fit-content`, marginRight: 15 }}>{min.toLocaleString()}</div>
                    <Slider
                        min={min}
                        max={max}
                        marks={false}
                        size={`small`}
                        color={`secondary`}
                        aria-label={`Range`}
                        defaultValue={defaultValue}
                        // valueLabelDisplay={`auto`}
                        onChange={(_, value) => setAmount(value)}
                    />
                    {/* <input 
                        min={min} 
                        max={max} 
                        type={`range`} 
                        id={`customRangeSlider`} 
                        defaultValue={defaultValue}
                        className={`customRangeSlider`} 
                        onInput={(e: any) => setAmount(parseFloat(e.target.value))}
                    /> */}
                    <div style={{ maxWidth: `fit-content`, marginLeft: 15 }}>{max.toLocaleString()}</div>
                </Stack>
            </div>
        </div>
    )
}