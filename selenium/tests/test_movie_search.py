from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager


def test_recommendation_list():
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service)
    wait = WebDriverWait(driver, 15)

    try:
        driver.get("https://movie-finder-d128b.web.app")

        # LOGIN
        wait.until(EC.visibility_of_element_located((By.ID, "email")))\
            .send_keys("test@mail.com")
        driver.find_element(By.ID, "password")\
            .send_keys("MMd4vEwEvDTi8ZZ")
        wait.until(EC.element_to_be_clickable(
            (By.CSS_SELECTOR, "button[type='submit']"))
        ).click()

        # Tunggu halaman Search (H1)
        wait.until(
            EC.visibility_of_element_located(
                (By.XPATH, "//h1[contains(., '🎬 MovieMatch')]")
            )
        )

        # Input query
        search_box = wait.until(
            EC.visibility_of_element_located(
                (By.CSS_SELECTOR, "input[type='text'], input[type='search']")
            )
        )
        search_box.send_keys("avatar")

        # Klik Search
        wait.until(
            EC.element_to_be_clickable(
                (By.XPATH, "//button[contains(., 'Search')]")
            )
        ).click()

        # Tunggu hasil search
        cards = wait.until(
            EC.presence_of_all_elements_located(
                (By.CSS_SELECTOR, "div[data-slot='card']")
            )
        )

        assert len(cards) > 0, "No recommendation movies displayed."

    finally:
        driver.quit()
