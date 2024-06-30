def count_query_in_input(INPUT, QUERY):
    result = []
    input_counter = {word: 0 for word in QUERY}

    for word in INPUT:
        if word in input_counter:
            input_counter[word] += 1

    for query_word in QUERY:
        result.append(input_counter.get(query_word, 0))

    return result

# Contoh penggunaan
INPUT = ['xc', 'dz', 'bbb', 'dz']
QUERY = ['bbb', 'ac', 'dz']
output = count_query_in_input(INPUT, QUERY)
print("OUTPUT =", output)  # Hasil: [1, 0, 2]
