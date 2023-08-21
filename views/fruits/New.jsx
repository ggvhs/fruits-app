import React from 'react'

function New() {
  return (
    <div>
        <h1>Fruit page New</h1>

        <form action="/fruits" method='POST'>
            Name:<input type="text" name='name'/> <br />
            Color: <input type="text" name='color'/> <br />
            Ready To Eat:<input type="checkbox" name='readyToEat'/> <br />
            <input type="submit" value="create Fruit" />
        </form>
    </div>
  )
}

module.exports = New