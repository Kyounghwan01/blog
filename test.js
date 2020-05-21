function solution(key, lock) {
  const m = key.length;
  const n = lock.length;

  const compareKeyLock = m - 1 + n + m - 1;
  let exLock = [];
  for (let i = 0; i < compareKeyLock; i++) {
    let temp = [];
    for (let j = 0; j < compareKeyLock; j++) {
      temp.push(0);
    }
    exLock.push(temp);
  }

  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      exLock[j + m - 1][i + m - 1] = lock[j][i];
    }
  }
  let answer = false;
  let count = 0;
  while (count < 4) {
    if (count > 0) {
      let copiedKey = key.map(row => row.slice());

      for (let j = 0; j < m; j++) {
        for (let i = 0; i < m; i++) {
          copiedKey[m - i - 1][j] = key[j][i];
        }
      }

      key = copiedKey.map(row => row.slice());
    }

    for (let right = 0; right < compareKeyLock - (m - 1); right++) {
      for (let down = 0; down < compareKeyLock - (m - 1); down++) {
        let copiedExLock = exLock.map(row => row.slice());

        for (let j = 0; j < m; j++) {
          for (let i = 0; i < m; i++) {
            copiedExLock[j + right][i + down] += key[j][i];
          }
        }

        let change = true;
        for (let j = 0; j < n; j++) {
          for (let i = 0; i < n; i++) {
            if (copiedExLock[j + m - 1][i + m - 1] !== 1) {
              change = false;
              break;
            }
          }
          if (!change) break;
        }

        if (change) {
          answer = true;
          break;
        }
      }
      if (answer) break;
    }
    count += 1;
  }

  return answer;
}
