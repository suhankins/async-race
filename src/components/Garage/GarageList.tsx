import { connect } from 'react-redux';
import Pagination from '../Pagination';
import { AppDispatch, RootState } from '../../store/rootStore';
import {
    IGarageEntry,
    getGarageFetch,
} from '../../store/features/garage/garageSlice';
import GarageItem from './GarageItem';
import { bindActionCreators } from '@reduxjs/toolkit';

const mapStateToProps = (state: RootState) => ({
    items: state.garage.cars,
    renderItem: GarageItem,
    currentPage: state.garage.currentPage,
    totalItems: state.garage.totalItems,
    itemsPerPage: state.garage.itemsPerPage,
});

function mapDispatchToProps(dispatch: AppDispatch) {
    return {
        getGarageFetch: () => {
            dispatch(getGarageFetch());
        },
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Pagination<IGarageEntry>);
