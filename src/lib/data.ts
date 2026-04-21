import portfolioData from '@/data/portfolio.json';

export type PortfolioData = typeof portfolioData;

export function getPortfolioData(): PortfolioData {
  return portfolioData;
}
