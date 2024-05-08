import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

const Home = () => {
  const loggedIn = { firstName: 'Kaushik', lastName: 'Moralwar', email: 'kaushikmoralwar9420@gmail.com' }
  return (
    <section className='home'>
        <div className="home-content">
            <header className="home-header">
                <HeaderBox 
                    type="greeting"
                    title="Welcome"
                    user={loggedIn?.firstName || 'Guest'}
                    subtext="Access and manage your account and transactions efficiently."
                />

                <TotalBalanceBox 
                    accounts={[]}
                    totalBanks={3}
                    totalCurrentBalance={1250.35}
                />
            </header>

            RECENT TRANSACTIONS
        </div>
        <RightSidebar 
            user={loggedIn}
            transactions={[]}
            banks={[{currentBalance: 12350.35}, {currentBalance: 12350.35}]}
        />
    </section>
  )
}

export default Home