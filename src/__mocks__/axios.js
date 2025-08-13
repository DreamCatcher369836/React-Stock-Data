const mockAxios = {
  get: jest.fn(() => Promise.resolve({ data: { 'Time Series (1min)': {} } }))
};

export default mockAxios;
