import express from 'express'
const router = express.Router({
  mergeParams: true
})

router.get('/', (req, res, next) => {
  console.log('get')
  // TODO: 출석 목록 조회
})

router.post('/', (req, res, next) => {
  console.log('post')
  // TODO: 출석 하기
  // TODO: 출석 포인트 지급 (하나의 트랜잭션)
})

export default router
