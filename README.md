# kmove
teamproject

## 디렉토리 구조
InventoryManagement/

├── data/

│   └── inventory.csv              # 상품 데이터 저장 파일

├── src/

│   └── com/

│       └── inventory/

│           ├── Main.java          # 프로그램 진입점 (main 메서드)

│           ├── model/

│               └── Item.java      # 상품 데이터 구조 (상품코드, 상품명, 재고수량, 가격)

│           ├── view/

│               └── MainFrame.java # GUI 화면 구성 (JFrame 또는 JavaFX Stage)

│           └── controller/

│               └── InventoryController.java # 이벤트 처리 및 CSV 파일 입출력 로직

├── .gitignore

└── README.md

### index.html
메인 화면 파일 - 예정

### css/
스타일시트 파일 모아두는 곳
* style.css: 화면 디자인, 테이블 및 버튼 스타일, 반응형 레이아웃 관련 코드

### js/
자바스크립트 로직 파일 모아두는 곳
* script.js: 상품 관리, 입출고 처리, 검색, 재고 계산, CSV 데이터 처리 등의 기능

### data/ 폴더
애플리케이션에서 사용하는 데이터 파일을 보관하는 곳
* inventory.csv: 상품코드, 상품명, 재고수량 등의 데이터 저장
