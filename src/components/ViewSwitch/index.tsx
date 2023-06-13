import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../../store/rootStore';
import { ViewSwitch as OriginalViewSwitch } from './ViewSwitch';
import { setCurrentViewIndex } from '../../store/features/views/viewsSlice';

const mapStateToProps = (state: RootState) => ({
    currentViewIndex: state.views.currentViewIndex,
});

function mapDispatchToProps(dispatch: AppDispatch) {
    return {
        setCurrentViewIndex: (index: number) => {
            dispatch(setCurrentViewIndex(index));
        },
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

const ViewSwitch = connector(OriginalViewSwitch);

export default ViewSwitch;
