const BASE_URL = 'https://directory.goodonyou.eco'

export const routes = {
  home: () => BASE_URL,
  category: (name: string) => `${BASE_URL}/categories/${name}`,
  brandJson: (name: string) =>
    `${BASE_URL}/_next/data/dJh8rxNDPedPhgY4ESydv/brand/${name}.json?id=${name}`
}
