Oto wyczerpujące notatki przygotowane ściśle na podstawie dostarczonego skryptu prof. Lucjana Jacaka („Krótki wykład z fizyki ogólnej”). Zachowałem notację i sposób argumentacji autora, co jest kluczowe dla powodzenia na egzaminie u tego prowadzącego.

---

# NOTATKI DO EGZAMINU Z FIZYKI (na podst. skryptu L. Jacaka)

## 1. Twierdzenie Gaussa i Stokesa (źródłowość i wirowość pola wektorowego)
*(Strony 78–81)*

Wprowadzenie matematyczne opiera się na operatorze „nabla” $\nabla = (\frac{\partial}{\partial x}, \frac{\partial}{\partial y}, \frac{\partial}{\partial z})$.

### Źródłowość pola (Dywergencja) i Twierdzenie Gaussa
*   **Dywergencja ($\text{div } \mathbf{A}$):** Iloczyn skalarny operatora $\nabla$ i pola wektorowego $\mathbf{A}$.
    $$ \text{div } \mathbf{A} = \nabla \cdot \mathbf{A} = \frac{\partial A_x}{\partial x} + \frac{\partial A_y}{\partial y} + \frac{\partial A_z}{\partial z} $$
*   **Interpretacja fizyczna:** Dywergencja określa „źródłowość” pola.
    *   $\text{div } \mathbf{A} > 0$: W danym punkcie jest źródło (linie pola „wypływają”).
    *   $\text{div } \mathbf{A} < 0$: W danym punkcie jest ujście (linie pola „wpływają”).
*   **Twierdzenie Gaussa:** Strumień pola wektorowego przez zamkniętą powierzchnię jest równy całce z dywergencji tego pola po objętości ograniczonej tą powierzchnią.
    $$ \oint \mathbf{A} \cdot d\mathbf{s} = \int \text{div } \mathbf{A} \, dV $$
    *   *Wniosek:* Jeśli całkowity strumień przez zamkniętą powierzchnię jest różny od zera, to wewnątrz musi znajdować się źródło tego pola.

### Wirowość pola (Rotacja) i Twierdzenie Stokesa
*   **Rotacja ($\text{rot } \mathbf{A}$):** Iloczyn wektorowy operatora $\nabla$ i pola wektorowego $\mathbf{A}$. Wynik jest wektorem.
    $$ \text{rot } \mathbf{A} = \nabla \times \mathbf{A} $$
*   **Interpretacja fizyczna:** Rotacja określa „wirowość” pola (cyrkulację). Jeśli $\text{rot } \mathbf{A} \neq 0$, pole ma tendencję do wirowania wokół punktu; linie pola mogą tworzyć zamknięte pętle.
*   **Twierdzenie Stokesa:** Cyrkulacja pola wzdłuż zamkniętej krzywej jest równa strumieniowi rotacji tego pola przez dowolną powierzchnię rozpiętą na tej krzywej.
    $$ \oint \mathbf{A} \cdot d\mathbf{l} = \int \text{rot } \mathbf{A} \cdot d\mathbf{s} $$
    *   *Reguła śruby prawoskrętnej:* Kierunek wektora $d\mathbf{s}$ jest powiązany z kierunkiem obiegu po krzywej $d\mathbf{l}$.

---

## 2. Równania Maxwella i ich interpretacja
*(Strony 81–86, 97-98)*

Profesor Jacak podkreśla, że równania te opisują powiązania między polami $\mathbf{E}$ (elektrycznym) i $\mathbf{B}$ (magnetycznym) a ich źródłami ($\rho$ - gęstość ładunku, $\mathbf{j}$ - gęstość prądu).

**Zestaw równań (w notacji ze skryptu, z jawnym $c$ i $\varepsilon_0$):**

1.  **Prawo Gaussa dla elektryczności:**
    $$ \text{div } \mathbf{E} = \frac{\rho}{\varepsilon_0} $$
    *   *Interpretacja:* Źródłem pola elektrycznego są ładunki elektryczne ($\rho$). Pole jest źródłowe.
2.  **Prawo Faradaya (zjawisko indukcji):**
    $$ \text{rot } \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t} $$
    *   *Interpretacja:* Zmienne w czasie pole magnetyczne wytwarza wirowe pole elektryczne.
3.  **Prawo Gaussa dla magnetyzmu:**
    $$ \text{div } \mathbf{B} = 0 $$
    *   *Interpretacja:* Pole magnetyczne jest bezźródłowe. Nie istnieją monopole magnetyczne (ładunki magnetyczne). Linie pola $\mathbf{B}$ są zawsze zamknięte.
4.  **Prawo Ampère’a-Maxwella:**
    $$ \text{rot } \mathbf{B} = \frac{\mathbf{j}}{c^2 \varepsilon_0} + \frac{1}{c^2} \frac{\partial \mathbf{E}}{\partial t} $$
    *   *Interpretacja:* Źródłem wirowego pola magnetycznego jest prąd przewodzenia ($\mathbf{j}$) oraz zmienne w czasie pole elektryczne (tzw. prąd przesunięcia Maxwella).

**Ogólna interpretacja wg autora:**
*   Pola $\mathbf{E}$ i $\mathbf{B}$ są ze sobą nierozerwalnie związane (szczególnie w ujęciu relatywistycznym). To, co w jednym układzie odniesienia jest polem czysto elektrycznym, w innym (poruszającym się) może być polem magnetycznym.
*   Równania przewidują istnienie fal elektromagnetycznych poruszających się z prędkością światła $c$.
*   Siła Lorentza działająca na ładunek: $\mathbf{F} = q\mathbf{E} + q\mathbf{v} \times \mathbf{B}$.

---

## 3. Wyprowadzenie równania ciągłości, zasada zachowania ładunku
*(Strona 84)*

Wyprowadzenie wynika bezpośrednio z równań Maxwella i tożsamości wektorowej $\text{div}(\text{rot } \mathbf{A}) = 0$.

1.  Bierzemy obustronną dywergencję z czwartego równania Maxwella (prawa Ampère’a-Maxwella):
    $$ \text{div}(\text{rot } \mathbf{B}) = \text{div}\left( \frac{\mathbf{j}}{c^2 \varepsilon_0} + \frac{1}{c^2} \frac{\partial \mathbf{E}}{\partial t} \right) $$
2.  Ponieważ lewa strona jest tożsamościowo równa zero ($\text{div rot} \equiv 0$), mamy:
    $$ 0 = \frac{1}{c^2 \varepsilon_0} \text{div } \mathbf{j} + \frac{1}{c^2} \frac{\partial}{\partial t} (\text{div } \mathbf{E}) $$
    (Zmieniono kolejność różniczkowania po czasie i po położeniu w drugim członie).
3.  Podstawiamy pierwsze równanie Maxwella ($\text{div } \mathbf{E} = \frac{\rho}{\varepsilon_0}$) do drugiego członu:
    $$ 0 = \frac{1}{c^2 \varepsilon_0} \text{div } \mathbf{j} + \frac{1}{c^2} \frac{\partial}{\partial t} \left( \frac{\rho}{\varepsilon_0} \right) $$
4.  Mnożąc przez $c^2 \varepsilon_0$, otrzymujemy **równanie ciągłości**:
    $$ \frac{\partial \rho}{\partial t} + \text{div } \mathbf{j} = 0 $$

**Interpretacja (Zasada zachowania ładunku):**
Ubytek ładunku w danej objętości w czasie ($\frac{\partial \rho}{\partial t}$) musi być równy strumieniowi prądu wypływającego z tej objętości ($\text{div } \mathbf{j}$). Ładunek nie ginie ani nie powstaje z niczego – może jedynie przepływać. Całkowa postać: $\frac{dQ}{dt} = - \oint \mathbf{j} \cdot d\mathbf{s}$.

---

## 4. Prawo Ohma i jego równoważne sformułowania
*(Strony 83–84)*

Prawo Ohma wiąże gęstość prądu z natężeniem pola elektrycznego w materii.

1.  **Postać mikroskopowa (lokalna):**
    $$ \mathbf{j} = \sigma \mathbf{E} $$
    gdzie:
    *   $\mathbf{j}$ – gęstość prądu,
    *   $\sigma$ – przewodnictwo właściwe materiału (stała materiałowa),
    *   $\mathbf{E}$ – natężenie pola elektrycznego.

2.  **Postać makroskopowa (dla obwodu):**
    Rozważając przewodnik o długości $l$ i przekroju $S$:
    *   Napięcie $U = E \cdot l$ (przy jednorodnym polu).
    *   Natężenie prądu $I = j \cdot S$.
    *   Podstawiając do wzoru lokalnego: $\frac{I}{S} = \sigma \frac{U}{l}$.
    *   Przekształcając: $U = I \frac{l}{\sigma S}$.
    *   Definiując opór $R = \frac{l}{\sigma S}$, otrzymujemy znane:
        $$ U = R \cdot I \quad \text{lub} \quad I = \frac{U}{R} $$

**Ważna uwaga ze skryptu:** Równania Maxwella są uniwersalne, ale prawo Ohma jest prawem empirycznym dotyczącym materii. W nadprzewodnikach prawo to nie obowiązuje (opór spada do zera).

---

## 5. Elektrostatyka, liniowa dystrybucja ładunków
*(Strona 93)*

Analiza pola wokół nieskończonej prostej naładowanej jednorodnie ładunkiem o gęstości liniowej $\lambda = \frac{dQ}{dl}$.

1.  **Symetria:** Ze względu na symetrię osiową, pole $\mathbf{E}$ jest prostopadłe do nici i zależy tylko od odległości $r$.
2.  **Powierzchnia Gaussa:** Wybieramy walec o promieniu $r$ i długości $l$, którego oś pokrywa się z nicią ładunku.
3.  **Zastosowanie prawa Gaussa:**
    $$ \oint \mathbf{E} \cdot d\mathbf{s} = \frac{Q}{\varepsilon_0} $$
    *   Strumień przez podstawy walca wynosi 0 (pole jest równoległe do podstaw).
    *   Strumień przez powierzchnię boczną: $E \cdot 2\pi r l$.
    *   Ładunek wewnątrz walca: $Q = \lambda l$.
4.  **Obliczenie:**
    $$ E \cdot 2\pi r l = \frac{\lambda l}{\varepsilon_0} $$
5.  **Wynik końcowy:**
    $$ E = \frac{\lambda}{2\pi \varepsilon_0 r} $$
    *Wniosek:* Pole maleje odwrotnie proporcjonalnie do pierwszej potęgi odległości ($1/r$), wolniej niż w przypadku ładunku punktowego ($1/r^2$).

---

## 6. Elektrostatyka, potencjał pola elektrycznego i pole elektryczne na ostrzu przewodnika
*(Strony 89–90)*

Autor wykorzystuje model połączonych kul, aby wyjaśnić zjawisko gromadzenia się ładunku na ostrzach ("efekt ostrza").

1.  **Potencjał ($V$):** Praca potrzebna do przeniesienia ładunku jednostkowego.
    $$ V = \frac{1}{4\pi \varepsilon_0} \frac{Q}{r} $$
2.  **Model:** Rozważamy dwie odległe od siebie kule metalowe o promieniach $R_1$ (duża) i $R_2$ (mała, $R_2 < R_1$), połączone cienkim przewodem.
3.  **Warunek równowagi:** Ponieważ są połączone przewodnikiem, stanowią jedną powierzchnię ekwipotencjalną. Potencjały na ich powierzchniach muszą być równe:
    $$ V_1 = V_2 \implies \frac{Q_1}{R_1} = \frac{Q_2}{R_2} $$
    Stąd stosunek ładunków: $\frac{Q_1}{Q_2} = \frac{R_1}{R_2}$.
4.  **Pole elektryczne przy powierzchni kul:**
    Wartość pola tuż przy powierzchni kuli wynosi $E = \frac{1}{4\pi \varepsilon_0} \frac{Q}{R^2}$.
    Porównując pola dla obu kul:
    $$ E_1 = \text{const} \frac{Q_1}{R_1^2}, \quad E_2 = \text{const} \frac{Q_2}{R_2^2} $$
    Podstawiając zależność ładunków:
    $$ \frac{E_1}{E_2} = \frac{Q_1}{R_1^2} \cdot \frac{R_2^2}{Q_2} = \left( \frac{R_1}{R_2} \right) \cdot \frac{R_2^2}{R_1^2} = \frac{R_2}{R_1} $$
    $$ E_2 = E_1 \frac{R_1}{R_2} $$
5.  **Wniosek (Ostrze):** Skoro $R_2 < R_1$, to $E_2 > E_1$.
    Gdy $R_2 \to 0$ (bardzo ostre ostrze), pole elektryczne $E_2 \to \infty$.
    *Interpretacja:* Na ostrzach przewodników panuje bardzo silne pole elektryczne, co ułatwia przebicie dielektryka (powietrza) i wyładowania (np. ognie św. Elma, piorunochrony, mikroskopia tunelowa).

---

## 7. Zasada Fermata, wyprowadzenie praw odbicia i załamania promieni świetlnych
*(Strony 102–105)*

**Zasada Fermata:** Światło porusza się po takiej drodze, dla której czas przelotu jest ekstremalny (najczęściej minimalny).
$$ \delta \int dt = 0 \quad \text{lub} \quad \delta \int n \, ds = 0 $$

### Wyprowadzenie prawa odbicia
1.  **Sytuacja:** Punkt A (źródło) i B (cel) nad zwierciadłem. Światło biegnie z A do zwierciadła (punkt x), a potem do B.
2.  **Geometria:**
    *   Wysokość A to $h$, wysokość B to $H$.
    *   Odległość pozioma między A i B to $d$.
    *   Punkt odbicia jest w odległości $x$ od rzutu A.
3.  **Czas przelotu:** Prędkość $v$ jest stała.
    $$ t(x) = \frac{\sqrt{h^2 + x^2}}{v} + \frac{\sqrt{H^2 + (d-x)^2}}{v} $$
4.  **Minimalizacja:** Obliczamy pochodną $\frac{dt}{dx}$ i przyrównujemy do 0.
    $$ \frac{1}{v} \frac{x}{\sqrt{h^2+x^2}} - \frac{1}{v} \frac{d-x}{\sqrt{H^2+(d-x)^2}} = 0 $$
5.  **Interpretacja geometryczna:** Człony te to sinusy kątów między promieniem a normalną (pionem).
    $$ \sin \alpha = \sin \beta \implies \alpha = \beta $$
    *Kąt padania jest równy kątowi odbicia.*

### Wyprowadzenie prawa załamania (Snella)
1.  **Sytuacja:** Światło przechodzi z ośrodka I (prędkość $v_1$) do ośrodka II (prędkość $v_2$). Granica jest płaska.
2.  **Czas przelotu:**
    $$ t(x) = \frac{\sqrt{h^2 + x^2}}{v_1} + \frac{\sqrt{H^2 + (d-x)^2}}{v_2} $$
3.  **Minimalizacja ($\frac{dt}{dx} = 0$):**
    $$ \frac{1}{v_1} \frac{x}{\sqrt{h^2+x^2}} - \frac{1}{v_2} \frac{d-x}{\sqrt{H^2+(d-x)^2}} = 0 $$
4.  **Wynik:** Zauważamy, że ułamki to sinusy kątów padania ($\alpha$) i załamania ($\beta$).
    $$ \frac{\sin \alpha}{v_1} = \frac{\sin \beta}{v_2} $$
    Przekształcając i wprowadzając współczynnik załamania $n_{1,2} = v_1/v_2$:
    $$ \frac{\sin \alpha}{\sin \beta} = \frac{v_1}{v_2} = n_{1,2} $$