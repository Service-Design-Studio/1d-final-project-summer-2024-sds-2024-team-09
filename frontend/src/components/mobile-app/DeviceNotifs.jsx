import React from 'react';

const DeviceNotifs = ({ title, count }) => {
    const getCircleStyle = (count) => {
        if (count === 0) {
            return 'bg-neutral text-primary';
        } else {
            return 'bg-accent text-white';
        }
    };

    return (
        <div>
            <div className="absolute inset-0 flex p-8 text-black">
                <div className="text-left">
                    <h3 className="text-lg font-bold">{title}</h3>

                </div>
                <div className={`absolute right-10 top-7 text-right w-10 h-10 rounded-full ${getCircleStyle(count)}`}>
                    <div className={" absolute right-3.5 top-1"}>
                        <h3 className="font-bold text-xl">{count} </h3>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default DeviceNotifs;
