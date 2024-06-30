def longest_word(sentence):
    words = sentence.split()
    longest = max(words, key=len)
    return longest

sentence = "Saya sangat senang mengerjakan soal algoritma"
longest_word_result = longest_word(sentence)
print("Kata terpanjang:", longest_word_result)
