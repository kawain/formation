function sanrenpukuFormation (first, second, third) {
  // Setオブジェクトを使用して重複を排除
  const combinationsSet = new Set()

  // 全ての位置に対して馬番を選択
  first.forEach(f => {
    second.forEach(s => {
      third.forEach(t => {
        // 異なる馬番の場合
        if (f !== s && f !== t && s !== t) {
          // 配列をソートして文字列化（Setで比較するため）
          const sortedCombo = [f, s, t].sort((a, b) => a - b)
          combinationsSet.add(JSON.stringify(sortedCombo))
        }
      })
    })
  })

  console.log("combinationsSet");
  console.log(combinationsSet);
  
  

  // 文字列化された組み合わせを配列に戻す
  const combinationsList = Array.from(combinationsSet)
    .map(combo => JSON.parse(combo))
    .sort((a, b) => {
      // 配列の比較
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return a[i] - b[i]
      }
      return 0
    })

  return combinationsList
}

// 使用例
const first = [1, 2, 4] // 1着目の馬番
const second = [1, 2, 4] // 2着目の馬番
const third = [1, 2, 4, 9, 10, 11, 12, 16] // 3着目の馬番

const combinations = sanrenpukuFormation(first, second, third)
console.log(`合計 ${combinations.length} 組み合わせ:`)
combinations.forEach(combo => {
  console.log(combo)
})
