

"use server"

export async function getCoordinatesFromCEP(cep: string) {
  const apiKey = process.env.GEOCODE_API_KEY;
  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${cep}&key=${apiKey}&countrycode=BR`;
  // const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=72580-100&key=${apiKey}&countrycode=BR`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      return { latitude: lat, longitude: lng };
    } else {
      throw new Error('Endereço não encontrado.');
    }
  } catch (error) {
    throw new Error(`Erro ao obter coordenadas ${error}`);
  }
}
