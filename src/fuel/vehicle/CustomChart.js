/* eslint-disable */
import React, { useState } from 'react';

const CustomChart = () => {
    const dataPoints = [
        { label: 'Best', value: 19 },
        { label: 'Average', value: 5 },
        { label: 'Worst', value: 2 },
    ];

    const [activeTooltip, setActiveTooltip] = useState(null);

    const handleMouseEnter = (index) => {
        setActiveTooltip(index);
    };

    const handleMouseLeave = () => {
        setActiveTooltip(null);
    };

    return (
        <div
            style={{
                width: '100%',
                height: '50px',
                position: 'relative',
                background: '#dedfe0',
                overflow: 'hidden',
                borderRadius: 10,
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '2px',
                    position: 'absolute',
                    left: 0,
                }}
            ></div>

            {dataPoints.map((point, index) => {
                const xPosition = (point.value / 20) * 100;

                let pointStyle = {};
                if (index === 0) {
                    pointStyle = {
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: 'blue',
                        cursor: 'pointer',
                    };
                } else if (index === 1) {
                    pointStyle = {
                        width: '2px',
                        height: '80px',
                        background: 'yellow',
                        borderLeft: '5px solid yellow',
                        position: 'absolute',
                        left: `${xPosition}%`,
                        transform: 'translateX(-50%)',
                    };
                } else if (index === 2) {
                    pointStyle = {
                        width: '2px',
                        height: '80px',
                        background: 'transparent',
                        borderLeft: '5px dotted red',
                        position: 'absolute',
                        left: `${xPosition}%`,
                        transform: 'translateX(-50%)',
                    };
                }

                return (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            bottom: '50%',
                            left: `${xPosition}%`,
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div style={pointStyle}></div>
                        <div
                            id={`tooltip-${index}`}
                            style={{
                                position: 'absolute',
                                top: '-20px',
                                left: '-30px',
                                padding: '5px',
                                background: 'rgba(0, 0, 0, 0.8)',
                                color: '#fff',
                                borderRadius: '5px',
                                fontSize: '12px',
                                visibility: activeTooltip === index ? 'visible' : 'hidden',
                            }}
                        >
                            {point.label} - {point.value}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
/* eslint-enable */
export default CustomChart;
