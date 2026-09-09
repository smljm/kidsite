def Add_andMultiply(a, b):
    s = a + b
    m = a * b
    return s, m

d1, d2 = Add_andMultiply(5,9)
print(d1, d2)

def gugudan(a=2):
    for b in range(1, 10):
        print("%d x %d = %d" % (a, b, a * b))
    return 

gugudan()
gugudan(7)