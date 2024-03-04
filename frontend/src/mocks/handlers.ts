import { http, HttpResponse } from 'msw';

interface Product {
  id: number;
  brand: string;
  name: string;
  price: number;
  rate: number;
  review: number;
}

const products: Product[] = [
  {
    id: 1,
    brand: 'LG전자',
    name: 'LG스타일러 5벌+1벌 S5MBAUE 블랙미러+실내제습',
    price: 1235440,
    rate: 19,
    review: 344,
  },
  {
    id: 2,
    brand: '아엠홈',
    name: '비침없는 도톰 레이스/쉬폰커튼(나비주름/핀형/봉집)',
    price: 41600,
    rate: 40,
    review: 31258,
  },
  {
    id: 3,
    brand: '동원',
    name: '동원참치 85g*12캔 3종 (라이트스탠다드/고추/콘참치)',
    price: 17980,
    rate: 25,
    review: 4475,
  },
  {
    id: 4,
    brand: 'LG전자',
    name: 'LG 디오스 식기세척기 오브제컬렉션 DUBJ2EAL',
    price: 929900,
    rate: 26,
    review: 250,
  },
  {
    id: 5,
    brand: 'LG전자',
    name: '비스포크 WF24B9600KE+DV20B9760CE 오토오픈도어',
    price: 2242719,
    rate: 7,
    review: 22,
  },
];
// 임시로 예시 코드 넣어놨음

const productsResolver = () => {
  return HttpResponse.json({ products });
};

export const handlers = [http.get('/products', productsResolver)];
