import wxRequest from './http';

export default {
  getNews(param) {
    return wxRequest('POST', 'v1/api/login/phone', param)
  }
}