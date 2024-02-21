// Funkce pro normalizaci řetězců odstraněním diakritiky
function normalizeString(input) {
    return input.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  
  // Funkce pro načítání dat ze serveru (předpokládáme, že data jsou ve formátu JSON)
  async function fetchData() {
    try {
      const response = await fetch('students.json');
      const data = await response.json();
  
      // Uložení dat do Local Storage
      localStorage.setItem('studentsData', JSON.stringify(data));
  
      // Zavolat funkci showStudent pouze pokud byla předchozí stránka specifikována v názvu HTML souboru
      const currentUrl = window.location.pathname.split('/').pop();
      const studentName = currentUrl.replace('.html', ''); // Odstranění .html z názvu souboru
      showStudent(studentName);
    } catch (error) {
      console.error('Chyba při načítání dat:', error);
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    // Při načtení celého HTML dokumentu spustit načítání dat
    fetchData();
  });
  
  function showStudent(studentName) {
    // Získání dat ze Local Storage
    const storedData = localStorage.getItem('studentsData');
    const studentsData = storedData ? JSON.parse(storedData) : [];
  
    // Normalizace jména pro správné porovnání
    const normalizedStudentName = normalizeString(studentName.toLowerCase());
  
    const studentInfoSection = document.getElementById('studentInfo');
  
    // Pokud se jméno rovná "index", nezobrazovat zprávu o nenašlém studentovi
    if (normalizedStudentName === 'index') {
      return;
    }
  
    // Najít studenta podle jména
    const student = studentsData.find(student => normalizeString(student.name.toLowerCase()) === normalizedStudentName);
  
    if (student) {
      // Pokud je student nalezen, zobrazit informace
      studentInfoSection.innerHTML = `
        <h2>${student.name}</h2>
        <p>${student.location}</p>
        <p>${student.age}</p>
        <p>${student.hobby}</p>
        <div>${student.bio}</div>
        <img src="${student.photo}" alt="${student.name}">
      `;
    } else {
      // Pokud student není nalezen, zobrazit odpovídající zprávu
      studentInfoSection.innerHTML = `<p>Student s názvem ${studentName} nebyl nalezen.</p>`;
    }
  }
  