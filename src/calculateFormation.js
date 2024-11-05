// 馬連用（順不同の2頭の組み合わせ）
export const calculateUmaren = (first, second) => {
  const combinations = []

  for (let i = 0; i < first.length; i++) {
    for (let j = 0; j < second.length; j++) {
      if (first[i] !== second[j]) {
        combinations.push([first[i], second[j]].sort((a, b) => a - b))
      }
    }
  }

  // 重複を除去（配列を文字列化して比較）
  const uniqueCombinations = Array.from(
    new Set(combinations.map(JSON.stringify)),
    JSON.parse
  )

  return {
    count: uniqueCombinations.length,
    combinations: uniqueCombinations
  }
}

// 馬単用（順序付きの2頭の組み合わせ）
export const calculateUmatan = (first, second) => {
  const combinations = []

  for (let i = 0; i < first.length; i++) {
    for (let j = 0; j < second.length; j++) {
      if (first[i] !== second[j]) {
        combinations.push([first[i], second[j]])
      }
    }
  }

  return {
    count: combinations.length,
    combinations: combinations
  }
}

// 3連複用（順不同の3頭の組み合わせ）
export const calculateSanrenpuku = (first, second, third) => {
  const combinations = []

  for (let i = 0; i < first.length; i++) {
    for (let j = 0; j < second.length; j++) {
      for (let k = 0; k < third.length; k++) {
        const nums = [first[i], second[j], third[k]]
        if (new Set(nums).size === 3) {
          combinations.push([...nums].sort((a, b) => a - b))
        }
      }
    }
  }

  // 重複を除去
  const uniqueCombinations = Array.from(
    new Set(combinations.map(JSON.stringify)),
    JSON.parse
  )

  return {
    count: uniqueCombinations.length,
    combinations: uniqueCombinations
  }
}

// 3連単用（順序付きの3頭の組み合わせ）
export const calculateSanrentan = (first, second, third) => {
  const combinations = []

  for (let i = 0; i < first.length; i++) {
    for (let j = 0; j < second.length; j++) {
      for (let k = 0; k < third.length; k++) {
        const nums = [first[i], second[j], third[k]]
        if (new Set(nums).size === 3) {
          combinations.push(nums)
        }
      }
    }
  }

  return {
    count: combinations.length,
    combinations: combinations
  }
}
