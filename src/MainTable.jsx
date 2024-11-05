import React, { useState, useEffect } from 'react'
import {
  calculateUmaren,
  calculateUmatan,
  calculateSanrenpuku,
  calculateSanrentan
} from './calculateFormation'

function MainTable () {
  const initialState = Object.fromEntries(
    Array.from({ length: 18 }, (_, i) => [i + 1, false])
  )

  const [firstRow, setFirstRow] = useState(initialState)
  const [secondRow, setSecondRow] = useState(initialState)
  const [thirdRow, setThirdRow] = useState(initialState)

  const [firstArr, setFirstArr] = useState([])
  const [secondArr, setSecondArr] = useState([])
  const [thirdArr, setThirdArr] = useState([])

  const [results, setResults] = useState({
    umaren: { count: 0, combinations: [] },
    umatan: { count: 0, combinations: [] },
    sanpuku: { count: 0, combinations: [] },
    santan: { count: 0, combinations: [] }
  })

  const getSelectedNumbers = row => {
    return Object.entries(row)
      .filter(([_, selected]) => selected)
      .map(([num]) => parseInt(num))
  }

  const handleClick1 = key => {
    const newRow = { ...firstRow, [key]: !firstRow[key] }
    setFirstRow(newRow)
    setFirstArr(getSelectedNumbers(newRow))
  }

  const handleClick2 = key => {
    const newRow = { ...secondRow, [key]: !secondRow[key] }
    setSecondRow(newRow)
    setSecondArr(getSelectedNumbers(newRow))
  }

  const handleClick3 = key => {
    const newRow = { ...thirdRow, [key]: !thirdRow[key] }
    setThirdRow(newRow)
    setThirdArr(getSelectedNumbers(newRow))
  }

  const handleReset = () => {
    setFirstRow(initialState)
    setSecondRow(initialState)
    setThirdRow(initialState)
    setFirstArr([])
    setSecondArr([])
    setThirdArr([])
    setResults({
      umaren: { count: 0, combinations: [] },
      umatan: { count: 0, combinations: [] },
      sanpuku: { count: 0, combinations: [] },
      santan: { count: 0, combinations: [] }
    })
  }

  useEffect(() => {
    if (firstArr.length > 0 && secondArr.length > 0 && thirdArr.length > 0) {
      setResults({
        umaren: calculateUmaren(firstArr, secondArr),
        umatan: calculateUmatan(firstArr, secondArr),
        sanpuku: calculateSanrenpuku(firstArr, secondArr, thirdArr),
        santan: calculateSanrentan(firstArr, secondArr, thirdArr)
      })
    } else if (firstArr.length > 0 && secondArr.length > 0) {
      setResults({
        umaren: calculateUmaren(firstArr, secondArr),
        umatan: calculateUmatan(firstArr, secondArr),
        sanpuku: { count: 0, combinations: [] },
        santan: { count: 0, combinations: [] }
      })
    } else {
      setResults({
        umaren: { count: 0, combinations: [] },
        umatan: { count: 0, combinations: [] },
        sanpuku: { count: 0, combinations: [] },
        santan: { count: 0, combinations: [] }
      })
    }
  }, [firstArr, secondArr, thirdArr])

  return (
    <>
      <div className='container'>
        <h1>競馬フォーメーション全組み合わせ</h1>
        <table className='main_table'>
          <thead>
            <tr>
              <th>馬番</th>
              {[...Array(18)].map((_, index) => (
                <th key={index + 1} className='num'>
                  {index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1着・1頭目</th>
              {Object.keys(firstRow).map(key => (
                <td
                  key={key}
                  onClick={() => handleClick1(key)}
                  className={firstRow[key] ? 'selected' : ''}
                >
                  {key}
                </td>
              ))}
            </tr>
            <tr>
              <th>2着・2頭目</th>
              {Object.keys(secondRow).map(key => (
                <td
                  key={key}
                  onClick={() => handleClick2(key)}
                  className={secondRow[key] ? 'selected' : ''}
                >
                  {key}
                </td>
              ))}
            </tr>
            <tr>
              <th>3着・3頭目</th>
              {Object.keys(thirdRow).map(key => (
                <td
                  key={key}
                  onClick={() => handleClick3(key)}
                  className={thirdRow[key] ? 'selected' : ''}
                >
                  {key}
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        <div className='button-container'>
          <button className='reset-button' onClick={handleReset}>
            リセット
          </button>
        </div>

        {/* 結果表示部分 */}
        <div className='results-container'>
          {firstArr.length > 0 && secondArr.length > 0 && (
            <>
              <div className='result-box'>
                <h3>馬連</h3>
                <p>組み合わせ数: {results.umaren.count}</p>
                <div className='combinations'>
                  {results.umaren.combinations.map((combo, index) => (
                    <span key={index}>{combo.join('-')} </span>
                  ))}
                </div>
              </div>

              <div className='result-box'>
                <h3>馬単</h3>
                <p>組み合わせ数: {results.umatan.count}</p>
                <div className='combinations'>
                  {results.umatan.combinations.map((combo, index) => (
                    <span key={index}>{combo.join('→')} </span>
                  ))}
                </div>
              </div>
            </>
          )}
          {firstArr.length > 0 && secondArr.length > 0 && thirdArr.length > 0 && (
            <>
              <div className='result-box'>
                <h3>3連複</h3>
                <p>組み合わせ数: {results.sanpuku.count}</p>
                <div className='combinations'>
                  {results.sanpuku.combinations.map((combo, index) => (
                    <span key={index}>{combo.join('-')} </span>
                  ))}
                </div>
              </div>

              <div className='result-box'>
                <h3>3連単</h3>
                <p>組み合わせ数: {results.santan.count}</p>
                <div className='combinations'>
                  {results.santan.combinations.map((combo, index) => (
                    <span key={index}>{combo.join('→')} </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default MainTable
