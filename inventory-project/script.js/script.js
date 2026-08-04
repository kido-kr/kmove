/*
  "use strict"는 JavaScript에서 실수를 줄이기 위한 엄격 모드입니다.

  잘못 작성된 변수나 일부 문법을 더 엄격하게 검사합니다.
*/
"use strict";

/*
  등록된 상품을 저장하는 배열입니다.

  배열은 여러 데이터를 순서대로 보관하는 공간입니다.

  처음에는 등록된 상품이 없으므로 빈 배열 []로 시작합니다.
*/
const products = [];

/*
  분류별 이름과 코드 앞글자를 하나의 객체로 정리합니다.

  food, office, living, electronics는
  프로그램 내부에서 사용하는 분류 이름입니다.

  name은 화면에 표시할 한글 이름입니다.
  prefix는 상품코드 앞에 붙는 글자입니다.
*/
const categories = {
  food: {
    name: "식품",
    prefix: "F"
  },

  office: {
    name: "사무용품",
    prefix: "O"
  },

  living: {
    name: "생활용품",
    prefix: "L"
  },

  electronics: {
    name: "전자제품",
    prefix: "E"
  }
};

/*
  document.getElementById("아이디")를 사용하면
  HTML에서 해당 id를 가진 요소를 가져올 수 있습니다.

  가져온 HTML 요소를 변수에 저장해두면
  이후에 계속 편하게 사용할 수 있습니다.
*/

// 상품 입력 전체 form
const productForm = document.getElementById("productForm");

// 분류 선택창
const categoryInput = document.getElementById("category");

// 상품명 입력창
const productNameInput = document.getElementById("productName");

// 재고수량 입력창
const stockInput = document.getElementById("stock");

// 가격 입력창
const priceInput = document.getElementById("price");

// 상품 목록이 들어갈 tbody
const productTableBody = document.getElementById("productTableBody");

// 성공 또는 오류 메시지가 표시될 p
const message = document.getElementById("message");

/*
  addEventListener는 특정 행동이 발생했을 때
  실행할 기능을 등록하는 명령어입니다.

  여기서는 productForm에서 submit이 발생하면
  아래 함수가 실행됩니다.

  submit은 '상품 추가' 버튼을 눌렀을 때 발생합니다.
*/
productForm.addEventListener("submit", function (event) {
  /*
    form은 기본적으로 제출되면 페이지가 새로고침됩니다.

    페이지가 새로고침되면 products 배열이 초기화되므로,
    preventDefault()를 이용해 기본 새로고침을 막습니다.
  */
  event.preventDefault();

  /*
    실제 상품 추가 기능을 담당하는 addProduct 함수를 실행합니다.
  */
  addProduct();
});

/*
  상품 추가 기능을 담당하는 함수입니다.

  함수는 특정 작업을 하나로 묶어놓은 코드입니다.
  addProduct()라고 작성하면 이 안의 코드가 실행됩니다.
*/
function addProduct() {
  /*
    categoryInput.value는
    사용자가 선택한 option의 value를 가져옵니다.

    식품을 선택했다면 category에는 "food"가 저장됩니다.
  */
  const category = categoryInput.value;

  /*
    상품명 입력창의 값을 가져옵니다.

    trim()은 글자의 앞뒤에 있는 불필요한 공백을 제거합니다.

    예:
    "   생수   " → "생수"
  */
  const productName = productNameInput.value.trim();

  /*
    input에 입력된 값은 type="number"여도
    처음에는 문자열 형태로 가져옵니다.

    빈 값인지 먼저 확인해야 하므로
    아직 숫자로 바꾸지 않고 문자열로 받습니다.
  */
  const stockText = stockInput.value;
  const priceText = priceInput.value;

  /*
    ----------------------------
    1. 입력값 검사
    ----------------------------
  */

  /*
    분류를 선택하지 않았다면 category는 빈 문자열 ""입니다.
  */
  if (category === "") {
    /*
      false는 오류 메시지라는 뜻으로 사용합니다.
    */
    showMessage("분류를 선택해주세요.", false);

    /*
      return을 만나면 함수가 즉시 종료됩니다.
      따라서 잘못된 상품은 등록되지 않습니다.
    */
    return;
  }

  /* 상품명을 입력하지 않은 경우입니다. */
  if (productName === "") {
    showMessage("상품명을 입력해주세요.", false);
    return;
  }

  /* 재고수량을 입력하지 않은 경우입니다. */
  if (stockText === "") {
    showMessage("재고수량을 입력해주세요.", false);
    return;
  }

  /* 가격을 입력하지 않은 경우입니다. */
  if (priceText === "") {
    showMessage("가격을 입력해주세요.", false);
    return;
  }

  /*
    Number()를 사용해 문자열을 실제 숫자로 변환합니다.

    "30" → 30
    "1000" → 1000
  */
  const stock = Number(stockText);
  const price = Number(priceText);

  /*
    Number.isInteger(stock)은 stock이 정수인지 검사합니다.

    정수:
    0, 1, 2, 30

    정수가 아님:
    1.5, 3.7

    !는 '아니다'라는 뜻입니다.

    !Number.isInteger(stock)
    = stock이 정수가 아니다
  */
  if (!Number.isInteger(stock) || stock < 0) {
    /*
      ||는 '또는'이라는 뜻입니다.

      정수가 아니거나
      음수이면 오류로 처리합니다.
    */
    showMessage(
      "재고수량은 0 이상의 정수로 입력해주세요.",
      false
    );

    return;
  }

  /*
    가격도 정수인지, 음수인지 확인합니다.
  */
  if (!Number.isInteger(price) || price < 0) {
    showMessage(
      "가격은 0 이상의 정수로 입력해주세요.",
      false
    );

    return;
  }

  /*
    ----------------------------
    2. 상품코드 자동 생성
    ----------------------------

    category가 food라면 F0001,
    office라면 O0001 같은 코드를 만듭니다.
  */
  const productCode = createProductCode(category);

  /*
    ----------------------------
    3. 새로운 상품 객체 만들기
    ----------------------------

    객체는 서로 관련 있는 정보를
    이름과 값의 형태로 묶어서 저장합니다.
  */
  const newProduct = {
    /*
      왼쪽은 데이터의 이름,
      오른쪽은 실제로 저장되는 값입니다.
    */
    code: productCode,
    name: productName,
    stock: stock,
    price: price,

    /*
      category에는 food가 들어 있지만,
      화면에는 식품이라고 표시해야 합니다.

      categories["food"].name의 결과는 "식품"입니다.
    */
    category: categories[category].name
  };

  /*
    만들어진 상품 객체는 다음과 같은 모습입니다.

    {
      code: "F0001",
      name: "생수",
      stock: 30,
      price: 1000,
      category: "식품"
    }
  */

  /*
    push()는 배열의 마지막에 새로운 데이터를 추가합니다.

    products 배열에 새 상품을 넣습니다.
  */
  products.push(newProduct);

  /*
    products 배열에 상품이 추가되었으므로
    표를 다시 그려주는 함수를 실행합니다.
  */
  renderProductTable();

  /*
    백틱(``) 안에서는 ${변수}를 사용해
    문자열 안에 변수의 값을 넣을 수 있습니다.

    productCode가 F0001이면 다음과 같이 표시됩니다.

    F0001 상품이 추가되었습니다.
  */
  showMessage(
    `${productCode} 상품이 추가되었습니다.`,
    true
  );

  /*
    form 안에 입력된 내용을 모두 초기화합니다.

    상품 추가 후 입력창이 다시 빈 상태가 됩니다.
  */
  productForm.reset();

  /*
    초기화가 끝난 후
    분류 선택창에 입력 위치를 다시 옮깁니다.
  */
  categoryInput.focus();
}

/*
  상품코드를 자동으로 생성하는 함수입니다.

  category에는 다음 중 하나가 들어옵니다.

  food
  office
  living
  electronics
*/
function createProductCode(category) {
  /*
    선택한 분류의 코드 앞글자를 가져옵니다.

    food → F
    office → O
    living → L
    electronics → E
  */
  const prefix = categories[category].prefix;

  /*
    filter()는 배열에서 조건에 맞는 데이터만 골라
    새로운 배열을 만드는 기능입니다.

    products 배열 중에서
    현재 선택한 prefix로 시작하는 상품만 가져옵니다.
  */
  const sameCategoryProducts = products.filter(function (product) {
    /*
      startsWith(prefix)는 문자열이
      특정 글자로 시작하는지 검사합니다.

      "F0001".startsWith("F") → true
      "O0001".startsWith("F") → false
    */
    return product.code.startsWith(prefix);
  });

  /*
    같은 분류 상품 중 가장 큰 번호를 저장합니다.

    아직 상품이 없다면 가장 큰 번호는 0입니다.
  */
  let largestNumber = 0;

  /*
    forEach()는 배열 안의 데이터를 하나씩 꺼내
    같은 작업을 반복합니다.
  */
  sameCategoryProducts.forEach(function (product) {
    /*
      예를 들어 product.code가 "F0003"이라고 가정합니다.

      substring(1)은 인덱스 1번부터 끝까지 가져옵니다.

      문자열의 위치:
      F 0 0 0 3
      0 1 2 3 4

      substring(1)의 결과:
      "0003"
    */
    const numberText = product.code.substring(1);

    /*
      "0003"을 숫자 3으로 변환합니다.
    */
    const codeNumber = Number(numberText);

    /*
      현재 코드 번호가 지금까지 확인한 가장 큰 번호보다 크다면
      largestNumber를 새 번호로 변경합니다.
    */
    if (codeNumber > largestNumber) {
      largestNumber = codeNumber;
    }
  });

  /*
    가장 큰 번호에 1을 더해서
    새로운 상품 번호를 만듭니다.

    가장 큰 번호가 2라면
    다음 번호는 3입니다.
  */
  const nextNumber = largestNumber + 1;

  /*
    padStart(4, "0")은 문자열의 길이가 네 자리가 될 때까지
    앞부분에 0을 붙여줍니다.

    "1" → "0001"
    "12" → "0012"
    "123" → "0123"
    "1234" → "1234"
  */
  const formattedNumber = String(nextNumber).padStart(4, "0");

  /*
    앞글자와 숫자를 합쳐서 최종 코드를 반환합니다.

    F + 0001 = F0001

    return은 계산된 결과를
    이 함수를 호출한 위치로 돌려줍니다.
  */
  return prefix + formattedNumber;
}

/*
  products 배열에 저장된 모든 상품을
  HTML 표에 출력하는 함수입니다.
*/
function renderProductTable() {
  /*
    상품을 다시 표시하기 전에
    tbody 안의 기존 내용을 모두 지웁니다.

    지우지 않으면 상품을 추가할 때마다
    기존 행까지 계속 중복되어 표시됩니다.
  */
  productTableBody.innerHTML = "";

  /*
    혹시 products 배열이 비어 있다면
    '등록된 상품이 없습니다.'라는 문구를 보여줍니다.

    현재는 상품 추가 직후 호출되므로 보통 실행되지 않지만,
    나중에 삭제 기능을 만들 때 필요할 수 있습니다.
  */
  if (products.length === 0) {
    const emptyRow = document.createElement("tr");
    const emptyCell = document.createElement("td");

    emptyCell.textContent = "등록된 상품이 없습니다.";

    /*
      표의 다섯 칸을 하나로 합칩니다.
    */
    emptyCell.colSpan = 5;

    emptyRow.appendChild(emptyCell);
    productTableBody.appendChild(emptyRow);

    return;
  }

  /*
    products 배열 안의 상품을 하나씩 꺼냅니다.
  */
  products.forEach(function (product) {
    /*
      document.createElement("tr")은
      새로운 표의 행을 만듭니다.
    */
    const row = document.createElement("tr");

    /*
      상품코드 칸을 만듭니다.
    */
    const codeCell = document.createElement("td");

    /*
      textContent를 사용해 칸에 상품코드를 넣습니다.
    */
    codeCell.textContent = product.code;

    /* 상품명 칸 */
    const nameCell = document.createElement("td");
    nameCell.textContent = product.name;

    /* 재고수량 칸 */
    const stockCell = document.createElement("td");

    /*
      toLocaleString("ko-KR")은
      큰 숫자에 쉼표를 넣어줍니다.

      1000 → 1,000
      1000000 → 1,000,000
    */
    stockCell.textContent =
      `${product.stock.toLocaleString("ko-KR")}개`;

    /* 가격 칸 */
    const priceCell = document.createElement("td");

    priceCell.textContent =
      `${product.price.toLocaleString("ko-KR")}원`;

    /* 분류 칸 */
    const categoryCell = document.createElement("td");
    categoryCell.textContent = product.category;

    /*
      만든 td들을 tr 안에 차례대로 넣습니다.

      결과:
      코드 | 상품명 | 재고수량 | 가격 | 분류
    */
    row.appendChild(codeCell);
    row.appendChild(nameCell);
    row.appendChild(stockCell);
    row.appendChild(priceCell);
    row.appendChild(categoryCell);

    /*
      완성된 한 줄을 tbody 안에 추가합니다.
    */
    productTableBody.appendChild(row);
  });
}

/*
  성공 또는 오류 메시지를 화면에 표시하는 함수입니다.

  text:
  화면에 표시할 문장

  isSuccess:
  true이면 성공
  false이면 오류
*/
function showMessage(text, isSuccess) {
  /*
    HTML의 <p id="message"> 안에 문장을 넣습니다.
  */
  message.textContent = text;

  /*
    성공 여부에 따라 글자색을 변경합니다.
  */
  if (isSuccess) {
    message.style.color = "green";
  } else {
    message.style.color = "red";
  }
}