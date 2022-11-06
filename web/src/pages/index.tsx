interface homeProps{
  poolCount:number;
  guessesCount:number;
  usersCount:number;
}
import Image from 'next/image'
import appPreviewImage from '../assets/app-nlw-copa-preview.png'
import logoImg from '../assets/logo.svg'
import usersAvatarImg from '../assets/users-avatar-example.png'
import iconCheckImg from '../assets/icon-check.svg';
import { api } from '../lib/axios';
import { FormEvent, useState } from 'react';
export default function Home({ poolCount, guessesCount, usersCount}:homeProps) {
  const [poolName, setPoolName] = useState("");

  async function createPool(event: FormEvent) {
    event.preventDefault();
    try {
      const response = await api.post('/pools', {
        title: poolName
      });
      const { code } = response.data;
      await navigator.clipboard.writeText(code)
      alert('Bolão criado, código disponível na aera de transferencia')
      setPoolName("")
    } catch (error) {
      alert('Falha ao criar o boão tente novamente!')
    }
    
  }
  return (
   <div className="max-w-6xl h-screen mx-auto grid grid-cols-2 items-center gap-28">
    <main>
      <Image src={logoImg} alt="logo da aplicação" quality={100}/>
      <h1 className="mt-16 text-white text-5xl font-bold leading-tight">
        Crie seu própio bolão da copa e compartilhe entre amigos!
      </h1>

      <div className="mt-10 flex items-center gap-2">
        <Image src={usersAvatarImg} alt="Sessão de avatares de exemplo"/>
        <strong className="text-gray-100 text-xl">
          <span className="text-ignite-500 ">+ {usersCount}</span> pessoas já estão usando.
        </strong>
      </div>
      <form className="mt-10 flex gap-2" onSubmit={createPool}>
        <input
          value={poolName}
          onChange={e => setPoolName(e.target.name)} 
          type="text" 
          required 
          placeholder="Qual nome do seu bolão?" 
          className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
        />
        <button 
          type="submit" 
          className="bg-yellow_nlw-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow_nlw-700"
        >
            Criar meu bolão
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-300 leading-relaxed">
        Após criar seu boão, voceê receberá um código único que poderá usar pra convidar outras pessoas 🚀
      </p>
      <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
        <div className="flex items-center gap-6">
          <Image src={iconCheckImg} alt="icone de check" quality={100} />
          <div className="flex flex-col">
            <span className="font-bold text-2xl">+ {poolCount}</span>
            <span>Bolões criados</span>
          </div>
        </div>
        <div className="w-px h-14 bg-gray-600"/>
        <div className="flex items-center gap-6">
          <Image src={iconCheckImg} alt="icone de check" quality={100} />
          <div className="flex flex-col">
            <span className="font-bold text-2xl">+ {guessesCount}</span>
            <span>Palpites enviados</span>
            </div>
        </div>
      </div>
    </main>
    <Image src={appPreviewImage} alt="Imagem do preview do app" quality={100}/>
   </div>
  )
}
export const getServerSideProps = async() => {


  const [poolCount, guessesCount, usersCount] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count')
  ])
  return {
    props:{
      poolCount: poolCount.data.count,
      guessesCount: guessesCount.data.count,
      usersCount: usersCount.data.count
    }
  }
}
