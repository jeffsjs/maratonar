import { durationToMin } from './'

describe('Convert duration to min', () => {
  it('Desejado 1h 20min ret 80', () => {
    expect(durationToMin("1h 20min")).toBe(80);
  });
  it('Desejado 2h ret 120', () => {
    expect(durationToMin("2h")).toBe(120);
  });
  it('Desejado 30min ret 30', () => {
    expect(durationToMin("30min")).toBe(30);
  });
  it('Desejado null ret 0', () => {
    expect(durationToMin()).toBe(0);
  });
});