def gugudan_grid(start, end):
    dans = list(range(start, end + 1))
    for start in range(0, len(dans), 4):
        rowdans = dans[start:start + 4]
        for b in range(1, 10):
            line = ""
            for d in rowdans:
                line += "%d x %d = %2d\t" % (d, b, d * b)
            print(line)
        print()  

if __name__ == "__main__":
    num1 = int(input("첫 번째 숫자를 입력하세요: "))
    num2 = int(input("두 번째 숫자를 입력하세요: "))
 
    start = min(num1, num2)
    end = max(num1, num2)
 
    gugudan_grid(start, end)