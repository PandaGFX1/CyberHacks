Tags: #Status/Complete #Type/Knowledge #Context/Hardware #publish-me

---
## Overview
Data representation defines how information is stored, structured, and interpreted in a computer system using binary values. It forms the foundation for how data is processed at the hardware level.

---

## Terminology
| Term                        | Definition                                                          |
| --------------------------- | ------------------------------------------------------------------- |
| Bit                         | 1 binary digit                                                      |
| Nibble                      | 4 bits (e.g., 1101)                                                 |
| Byte                        | 8 bits (e.g., 1101 1110)                                            |
| Word                        | 16 bits (2 bytes)                                                   |
| Double Word                 | 32 bits (4 bytes)                                                   |
| Quad Word                   | 64 bits (8 bytes)                                                   |
| Positional Notation         | System for representing numbers based on position (e.g., binary)    |
| Base                        | The number of unique digits used in a number system (e.g., base 10) |
| Most Significant Bit (MSB)  | Leftmost bit; also represents the sign in signed integers           |
| Least Significant Bit (LSB) | Rightmost bit                                                       |

---
## Core Concepts

### Number Systems
Data sizes typically scale in powers of 2. Computers use multiple number systems to represent values efficiently.

| System           | Base    | Digits Used |
| ---------------- | ------- | ----------- |
| Binary           | Base 2  | 0, 1        |
| Octal            | Base 8  | 0–7         |
| Decimal / Denary | Base 10 | 0–9         |
| Hexadecimal      | Base 16 | 0–9, A–F    |

### Signed Integers
- The **Most Significant Bit (MSB)** represents the sign:
  - `0` → Positive
  - `1` → Negative
- One bit is reserved for the sign; remaining bits represent the magnitude

### Floating Point Representation
Used to represent real numbers (numbers with decimals). Based on the **IEEE 754** standard.

| Component              | Role                           |
| ---------------------- | ------------------------------ |
| Sign Bit               | Indicates positive or negative |
| Exponent               | Determines scale               |
| Mantissa (Significand) | Stores the precision value     |

- Common formats: **32-bit** (single precision), **64-bit** (double precision)
- Enables efficient representation of very large and very small numbers

---
## Related Concepts
- [[CPU Architecture]]
- [[Memory Architecture]]

## Related Techniques
- 

## Related Tools
- 

---
## References / Images
- Binary/hex conversion charts
- IEEE 754 diagrams