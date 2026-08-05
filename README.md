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

### data/

inventory.csv: 프로그램이 실행되거나 저장할 때 읽고 쓰는 실제 데이터 파일이 위치하는 곳입니다. 자바 코드로 data/inventory.csv 경로를 직접 지정해 읽고 쓸 수 있습니다.

### src/com/inventory/

Main.java: 프로그램을 실행 파일

#### model/

재고 정보 관리

#### view/

화면

#### controller/

이건 저것 이벤트 처리
