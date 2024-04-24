import { Pagination } from '../../../../components/Pagination';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../store/hooks';
import { nextButtonPaginationWinner, prevButtonPaginationWinner } from '../../../../store/slices/WinnerSlice';

function WinnerPagination() {
  const dispatch = useDispatch();
  const totalPage = useAppSelector(state => state.winners.totalPage);
  const curPage = useAppSelector(state => state.winners.currentPage);

  return (
        <Pagination
            prevAction={() => dispatch(prevButtonPaginationWinner())}
            nextAction={() => dispatch(nextButtonPaginationWinner())}
            totalPage={totalPage}
            curPage={curPage}
        />
  );
}

export default WinnerPagination;