import { FC } from 'react';
import { IGarageEntry } from '../../store/features/garage/garageSlice';

const GarageItem: FC<IGarageEntry> = (garageEntry) => {
    // TODO: Implement
    return (
        <div>
            <h1>{garageEntry.name}</h1>
            <p>{garageEntry.color}</p>
        </div>
    );
};

export default GarageItem;
