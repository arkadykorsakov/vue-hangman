import axios from 'axios'

interface GetResponseName {
  FirstName: string
}

export const getRandomName = async (): Promise<string> => {
  try {
    const { data } = await axios.get<GetResponseName>(
      'http://api.randomdatatools.ru/?unescaped=false&params=FirstName'
    )
    return data.FirstName
  } catch (e) {
    console.log(e)
    throw e
  }
}
