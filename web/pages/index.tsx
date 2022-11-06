interface homeProps{
  count:number;
}
export default function Home({count}:homeProps) {
  return (
    <div>Contagem: {count}</div>
  )
}
export const getServerSideProps = async() => {
  const result =  await fetch('http://localhost:3535/pools/count')
  const data = await result.json()
  console.log(data)
  return {
    props:{
      count: data.count
    }
  }
}
