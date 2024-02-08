import { Dispatch, SetStateAction, useRef } from 'react';
import styled from 'styled-components';
import TopInfo from '@/components/route/bottomSheet/TopInfo';
import BackBtn from '@/components/route/common/BackBtn';
import DetailRoute from '@/components/main/DetailRoute';

interface IBottomSheetType {
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: Dispatch<SetStateAction<boolean>>;
}
export default function BottomSheet({
  isBottomSheetOpen,
  setIsBottomSheetOpen,
}: IBottomSheetType) {
  const modalRef = useRef(null);

  const modalOutSideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      setIsBottomSheetOpen(false);
    }
  };

  return (
    <Container
      ref={modalRef}
      onClick={(e) => modalOutSideClick(e)}
      $isBottomSheetOpen={isBottomSheetOpen}
    >
      {isBottomSheetOpen && <BackBtn isBottomSheetOpen={isBottomSheetOpen} />}
      <div>
        <TopInfo setIsBottomSheetOpen={setIsBottomSheetOpen} />
        <PathDetailInfo className="hide-scroll">
          <DetailRoute index={0} />
        </PathDetailInfo>
      </div>
    </Container>
  );
}

const Container = styled.div<{ $isBottomSheetOpen: boolean }>`
  z-index: 10;
  width: 390px;
  height: ${(props) => props.$isBottomSheetOpen && '100vh'};
  position: absolute;
  bottom: 0;
  background-color: rgba(36, 36, 36, 0.5);

  > div:last-of-type {
    position: absolute;
    bottom: 88px;

    height: calc(100vh - 203px);

    transform: ${(props) =>
      props.$isBottomSheetOpen ? 'translate(0, 0)' : 'translate(0, 85%)'};
    transition: all 0.5s ease-in-out;
  }
`;

const PathDetailInfo = styled.div`
  width: 390px;
  height: 100%;
  padding: 24px 16px 88px;
  background-color: #fff;
  overflow: auto;
`;
