import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return original text if shorter than limit', () => {
    const text = 'Short text';
    const result = pipe.transform(text, 20);
    expect(result).toBe('Short text');
  });

  it('should truncate text longer than limit', () => {
    const text = 'This is a very long text that should be truncated';
    const result = pipe.transform(text, 20);
    expect(result).toBe('This is a very long ...');
  });

  it('should use default limit of 50 when not specified', () => {
    const text = 'a'.repeat(60);
    const result = pipe.transform(text);
    expect(result.length).toBe(53); // 50 chars + '...'
    expect(result.endsWith('...')).toBe(true);
  });

  it('should handle empty strings', () => {
    const result = pipe.transform('', 10);
    expect(result).toBe('');
  });

  it('should handle exactly limit length', () => {
    const text = 'Exactly twenty chars';
    const result = pipe.transform(text, 20);
    expect(result).toBe('Exactly twenty chars');
  });

  it('should handle limit of 0', () => {
    const text = 'Some text';
    const result = pipe.transform(text, 0);
    expect(result).toBe('...');
  });

  it('should handle negative limit as 0', () => {
    const text = 'Some text';
    const result = pipe.transform(text, -5);
    expect(result).toBe('...');
  });

  it('should preserve word boundaries when possible', () => {
    const text = 'This is a test string with many words';
    const result = pipe.transform(text, 15);
    expect(result).toBe('This is a test ...');
  });

  it('should use completeWords parameter when true', () => {
    const text = 'This is a very long sentence to test';
    const result = pipe.transform(text, 20, true);
    // It should break at last space before limit
    expect(result).toContain('...');
    expect(result.trim().endsWith('...'));
  });
});
