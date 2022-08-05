def find_function(list_value) -> str :
    valeur_impaire = []
    for el in list_value :
        if not el % 2 == 0:
            valeur_impaire.append(el)

    if len(valeur_impaire) == 0 :
        print(f"il n'y a pas de nombre impaire dans {list_value} ")
    else :
        print(f"le nombre impaire dans {list_value} sont : ")
        for value in valeur_impaire :
            print(f"{value}") 



test = [

[6,11,7,9,2],
[2,4],
[88],
[1],
[]

]
for test_value in test :
    find_function(test_value)  