## TISTORY Custom Skin
- 원작자: [mag1c](https://mag1c.tistory.com)
- 수정 재배포 가능합니다.

### 사용법
1. Code > ZIP 다운로드
2. .gitignore, README.md를 제외하고 티스토리 스킨 변경에 업로드 및 적용

### 사용된 폰트
- **기본 폰트**: omyu_pretty ([눈누 폰트](https://noonnu.cc/))
  - `@font-face { font-family: 'omyu_pretty'; }`
- **코드블럭 폰트**: GangwonEduSaeeum_OTFMediumA ([눈누 폰트](https://noonnu.cc/))
  - `@font-face { font-family: 'GangwonEduSaeeum_OTFMediumA'; }`
- **인라인 코드 폰트**: SFMono-Regular, Consolas (시스템 폰트)

### 개선 필요 메모
1. 홈 설정, 기본 설정(index.xml)의 기본값이 무슨 짓을 해도 "목록"은 안됨

### 변경 히스토리

#### 2025-08-22
- **레이아웃 개선**
  - 중앙 정렬된 콘텐츠 영역 구현 (max-width: 1000px)
  - 배경과 콘텐츠 영역 시각적 분리 (백그라운드: #f5f5f5, 콘텐츠: white)
  - 둥근 모서리 적용 (border-radius: 20px)
  - 그림자 효과로 깊이감 추가

- **TOC (목차) 기능 추가**
  - 우측 고정 위치에 목차 자동 생성 (h2, h3, h4 태그 기반)
  - 스크롤 트래킹으로 현재 위치 하이라이트
  - 텍스트 오버플로우 시 말줄임표(...) 처리
  - 1400px 이하에서 자동 숨김

- **타이포그래피 및 스타일 개선**
  - 티스토리 특수 클래스 대응 강화 (`!important` 적용)
  - 본문 폰트 크기: 1.25rem
  - h1: 3rem, h2: 2.5rem, h3: 2rem으로 조정
  - 인라인 코드 스타일 GitHub 마크다운 스타일로 변경
  - hljs-params 색상 변경 (초록색 → 빨간색)

- **코드블럭 스타일 조정**
  - 마진: 위아래 1em
  - 패딩: 0.5em (글자 반 개 정도)
  - 배경색: var(--pastel-blue) 유지

- **이미지 스타일**
  - 마진: 위아래 1em (기존 2em)
  - figure 태그 내 이미지 스타일 강제 적용

- **광고 오버플로우 방지**
  - 구글 애드센스 max-width: 100% 적용
  - 광고 iframe 너비 제한
  - 반응형 광고 컨테이너 조정
