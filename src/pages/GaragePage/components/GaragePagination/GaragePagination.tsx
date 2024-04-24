import { Pagination } from '../../../../components/Pagination';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../store/hooks';
import { nextButtonPaginationGarage, prevButtonPaginationGarage } from '../../../../store/slices/CarManageSlice';

function GaragePagination() {
  const dispatch = useDispatch();
  const totalPage = useAppSelector(state => state.allCars.totalPage);
  const curPage = useAppSelector(state => state.allCars.currentPage);
    
  return (
        <Pagination
            prevAction={() => dispatch(prevButtonPaginationGarage())}
            nextAction={() => dispatch(nextButtonPaginationGarage())}
            totalPage={totalPage}
            curPage={curPage}
        />
  );
}

export default GaragePagination;