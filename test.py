# https://www.jra.go.jp/kouza/useful/mark_form_tensu/


def sanrenpuku_formation(first, second, third):
    """
    三連複フォーメーションの全組み合わせを表示
    first: 1着目の馬番リスト
    second: 2着目の馬番リスト
    third: 3着目の馬番リスト
    """
    combinations_set = set()

    # 全ての位置に対して馬番を選択
    for f in first:
        for s in second:
            for t in third:
                # 異なる馬番の場合
                if f != s and f != t and s != t:
                    combinations_set.add(tuple(sorted([f, s, t])))

    combinations_list = sorted(list(combinations_set))
    return combinations_list


# 使用例
first = [1, 2, 4]  # 1着目の馬番
second = [1, 2, 4]  # 2着目の馬番
third = [1, 2, 4, 9, 10, 11, 12, 16]  # 3着目の馬番

combinations = sanrenpuku_formation(first, second, third)
print(f"合計 {len(combinations)} 組み合わせ:")
for combo in combinations:
    print(combo)