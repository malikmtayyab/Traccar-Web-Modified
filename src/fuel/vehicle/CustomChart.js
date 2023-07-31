/* eslint-disable */
import React from 'react';

const CustomChart = () => {
    const dataPoints = [
        { label: 'Best', value: 19 },
        { label: 'Average', value: 5 },
        { label: 'Worst', value: 2 },
    ];

    const handleMouseEnter = (index) => {
        const point = dataPoints[index];
        const tooltip = document.getElementById(`tooltip-${index}`);
        tooltip.innerHTML = `${point.label} - ${point.value}`;
        tooltip.style.visibility = 'visible';
    };

    const handleMouseLeave = (index) => {
        const tooltip = document.getElementById(`tooltip-${index}`);
        tooltip.style.visibility = 'hidden';
    };


    return (
        <div
            style={{
                width: '100%',
                height: '50px', // Increase the height to make space for labels
                position: 'relative',
                background: '#dedfe0',
                overflow: 'hidden', // Add this to keep points within the div
                borderRadius: 10,
            }}
        >
            {/* X-Axis */}
            <div
                style={{
                    width: '100%',
                    height: '2px',
                    position: 'absolute',
                    bottom: '50%',
                    left: 0,
                }}
            ></div>

            {/* Data Points */}
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
                        // marginBottom: '5px',
                    };
                } else if (index === 1) {
                    pointStyle = {
                        width: '2px',
                        height: '80px', // Set a fixed height for the vertical line
                        background: 'yellow',
                        borderLeft: '5px solid yellow', // Set the border to show the vertical line
                        position: 'absolute',
                        // bottom: '50%',
                        left: `${xPosition}%`,
                        transform: 'translateX(-50%)',
                    };
                } else if (index === 2) {
                    pointStyle = {
                        width: '2px',
                        height: '80px', // Set a fixed height for the vertical line
                        background: 'transparent',
                        borderLeft: '5px dotted red', // Set the border to show the dotted vertical line
                        position: 'absolute',
                        // bottom: '50%',
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
                        onMouseLeave={() => handleMouseLeave(index)}
                    >
                        <div style={pointStyle}></div>
                        <div
                            id={`tooltip-${index}`}
                            style={{
                                position: 'absolute',
                                top: '-25px',
                                left: '-30px',
                                padding: '5px',
                                background: 'rgba(0, 0, 0, 0.8)',
                                color: '#fff',
                                borderRadius: '5px',
                                fontSize: '12px',
                                visibility: 'hidden',
                            }}
                        ></div>
                    </div>
                );
            })}
        </div>

    );
};
/* eslint-enable */
export default CustomChart;
