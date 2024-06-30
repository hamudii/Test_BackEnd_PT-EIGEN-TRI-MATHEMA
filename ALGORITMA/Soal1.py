def reverse_string_with_digits(input_str):
    digits = ''.join(filter(str.isdigit, input_str))  # Ambil angka di akhir
    letters = ''.join(filter(str.isalpha, input_str))  # Ambil huruf-huruf saja

    reversed_letters = letters[::-1]  # Balik urutan huruf

    return reversed_letters + digits  # Gabungkan dengan angka di akhir

# Contoh penggunaan
input_string = "NEGIE1"
reversed_string = reverse_string_with_digits(input_string)
print(reversed_string)  # Output: "EIGEN1"
