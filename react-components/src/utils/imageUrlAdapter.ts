const imageUrlAdapter = (url: string): string => {
  const [edpoint] = url.split('pokemon').reverse();
  const order = edpoint.replace(/\//g, '');
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${order}.png`;
};

export default imageUrlAdapter;
