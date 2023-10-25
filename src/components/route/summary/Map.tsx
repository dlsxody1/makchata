import React, { useEffect } from 'react';
import styled from 'styled-components';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

export default function Map() {
  useEffect(() => {
    // 지도불러오는 script
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services,clusterer,drawing`;
    document.head.appendChild(kakaoMapScript);

    // 지도 띄우기
    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        // 초기 지도화면
        const mapContainer = document.getElementById('map');
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        // 지도 확대, 축소 이벤트
        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
          map.getLevel();
        });

        // 다중 마커 표시
        const positions = [
          {
            title: '출발지',
            latlng: new window.kakao.maps.LatLng(33.450705, 126.570677),
            src: 'https://t1.daumcdn.net/localimg/localimages/07/2018/pc/flagImg/blue_b.png',
          },
          {
            title: '도착지',
            latlng: new window.kakao.maps.LatLng(33.450936, 126.569477),
            src: 'https://t1.daumcdn.net/localimg/localimages/07/2018/pc/flagImg/red_b.png',
          },
        ];

        // 마커 이미지 크기
        const imageSize = new window.kakao.maps.Size(37, 42);

        for (const position of positions) {
          // 마커 이미지 생성
          const markerImage = new window.kakao.maps.MarkerImage(
            position.src,
            imageSize
          );

          // 마커 생성
          new window.kakao.maps.Marker({
            map, // 마커를 표시할 지도
            position: position.latlng, // 마커를 표시할 위치
            title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨
            image: markerImage, // 마커 이미지
          });
        }
      });
    };

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
  }, []);

  return <Container id="map"></Container>;
}

const Container = styled.div`
  z-index: 0;
  width: 390px;
  height: 442px;
`;
