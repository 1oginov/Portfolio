import { getAuthProvider, getPositionsCollectionPath, getPositionDocumentPath } from './index';

describe('getAuthProvider', () => {
  it('returns Google auth provider if "google" passed', () => {
    expect(getAuthProvider('google')).toHaveProperty('providerId', 'google.com');
  });

  it('throws error matching snapshot if unknown provider passed', () => {
    expect(() => getAuthProvider('unknown')).toThrowErrorMatchingSnapshot();
  });
});

describe('getPositionsCollectionPath', () => {
  it('matches snapshot', () => {
    expect(getPositionsCollectionPath('userId')).toMatchSnapshot();
  });
});

describe('getPositionDocumentPath', () => {
  it('matches snapshot', () => {
    expect(getPositionDocumentPath('userId', 'positionId')).toMatchSnapshot();
  });
});
