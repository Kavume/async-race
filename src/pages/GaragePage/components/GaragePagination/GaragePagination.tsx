import { Pagination } from '../../../../components/Pagination';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../store/hooks';
import { nextButtonPaginationGarage, prevButtonPaginationGarage } from '../../../../store/slices/CarManageSlice';
import { resetWinner } from '../../../../store/slices/WinnerSlice';

function GaragePagination() {
  const dispatch = useDispatch();
  const totalPage = useAppSelector(state => state.allCars.totalPage);
  const curPage = useAppSelector(state => state.allCars.currentPage);
  const totalCars = useAppSelector(state => state.allCars.totalCars);

  return (
        <Pagination
            prevAction={() => {
              dispatch(resetWinner());
              dispatch(prevButtonPaginationGarage());
            }}
            nextAction={() => {
              dispatch(resetWinner());
              dispatch(nextButtonPaginationGarage());
            }}
            totalPage={totalPage}
            curPage={curPage}
            totalCars={totalCars}
        />
  );
}

export default GaragePagination;