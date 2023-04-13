import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import InputProduct from "./InputProduct";
import { store } from "../../store";
import { Provider } from "react-redux";
import { vi } from "vitest";
import {fireEvent, render, screen, waitFor} from '@testing-library/react'

describe("InputProduct component", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Provider store={store}>
            <InputProduct />
          </Provider>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("submits the form correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <InputProduct onSubmit={vi.fn()} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

//   memastikan bahwa form input Product Name dapat menerima input teks dan menampilkannya di halaman.
  it("name form input correctly", () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <InputProduct onSubmit={vi.fn()} />
        </MemoryRouter>
      </Provider>
    );
    const input = getByLabelText("Name Product");
    act(() => {
      fireEvent.change(input, { target: { value: "Test Product" } });
    });
    expect(input.value).toBe("Test Product");
  });

  // Test agar name tidak kurang dari 2 abjad
  it("Name form input not <  2 character", async () => {
    const { getByLabelText, getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <InputProduct onSubmit={vi.fn()} />
        </MemoryRouter>
      </Provider>
    );
    const input = getByLabelText("Name Product");
    act(() => {
      fireEvent.change(input, { target: { value: "a" } });
      fireEvent.blur(input);
    });
    await waitFor(() => {
      expect(getByTestId("errors")).toBeInTheDocument();
    });
    expect(getByTestId("errors")).toHaveTextContent("name must be at least 2 characters");

  });

  // Test agar name tidak lebih dari 25 abjad
  it("Name form input not > 25 character", async () => {
    const { getByLabelText, getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <InputProduct onSubmit={vi.fn()} />
        </MemoryRouter>
      </Provider>
    );
    const input = getByLabelText("Name Product");
    act(() => {
      fireEvent.change(input, { target: { value: "aaaaaaaaaaaaaaaaaaaaaaaaaa" } });
      fireEvent.blur(input);
    });
    await waitFor(() => {
      expect(getByTestId("errors")).toBeInTheDocument();
    });
    expect(getByTestId("errors")).toHaveTextContent("name must be at most 25 characters");

  });
  // Test agar name tidak mengandung @/#{}
  it("Name form input not contains @/#{} ", async () => {
    const { getByLabelText, getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <InputProduct onSubmit={vi.fn()} />
        </MemoryRouter>
      </Provider>
    );
    const input = getByLabelText("Name Product");
    act(() => {
      fireEvent.change(input, { target: { value: "@/#{}" } });
      fireEvent.blur(input);
    });
    await waitFor(() => {
      expect(getByTestId("errors")).toBeInTheDocument();
    });
    expect(getByTestId("errors")).toHaveTextContent(`name must match the following: "/^[a-zA-Z ]+$/"`);
  });


//   memastikan bahwa form input Product Category dapat menerima input teks dan menampilkannya di halaman.
  it("Category  form input correctly", () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <InputProduct onSubmit={vi.fn()} />
        </MemoryRouter>
      </Provider>
    );
    const inputCategory = getByLabelText("Product Category");
    act(() => {
      fireEvent.change(inputCategory, { target: { value: 'Category 1' } });
    });
    expect(inputCategory.value).toBe('Category 1');
  });

 

  //   memastikan bahwa form input Product Image dapat menerima dan menampilkannya di halaman.
  it("Image form input correctly", () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <InputProduct onSubmit={vi.fn()} />
        </MemoryRouter>
      </Provider>
    );
    const inputImage = getByLabelText("Product Image");
    act(() => {
      fireEvent.input(inputImage, { target: { value: '' } });
      fireEvent.change(inputImage, { target: { files: [new File(['image.png'], 'image.png', { type: 'image/png' })] } });
    });
    expect(inputImage.files[0].name).toBe('image.png');
  });

//   memastikan bahwa form input Product Freshness dapat menerima input teks dan menampilkannya di halaman.
  it("Freshness form input correctly", () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <InputProduct onSubmit={vi.fn()} />
        </MemoryRouter>
      </Provider>
    );
    const inputFreshness = getByLabelText("Freshness");
    act(() => {
      fireEvent.change(inputFreshness, { target: { value: 'hayyy' } });
    });
    expect(inputFreshness.value).toBe('hayyy');
  });

//   memastikan bahwa form input Product Description dapat menerima input teks dan menampilkannya di halaman.
  it("Description form input correctly", () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <InputProduct onSubmit={vi.fn()} />
        </MemoryRouter>
      </Provider>
    );
    const inputDescription = getByLabelText("Description Product");
    act(() => {
      fireEvent.change(inputDescription, { target: { value: 'hayyy' } });
    });
    expect(inputDescription.value).toBe('hayyy');
  });

//   memastikan bahwa form input Product Price dapat menerima input teks dan menampilkannya di halaman.
  it("price form input correctly", () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <InputProduct onSubmit={vi.fn()} />
        </MemoryRouter>
      </Provider>
    );
    const inputPrice = getByLabelText("Price Product");
    act(() => {
      fireEvent.change(inputPrice, { target: { value: '2323' } });
    });
    expect(inputPrice.value).toBe('2323');
  });


//  Testing Semua Field Tidak boleh kosong
  it("form submit input correctly", async () => {
    //mocksubmit untuk fake user submit
    const mockSubmit = vi.fn()
    const { getByTestId, getByLabelText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <InputProduct onSubmit={mockSubmit} />
        </MemoryRouter>
      </Provider>
    ); 
    const form = getByTestId("form");
    const input = getByLabelText("Name Product");
    const inputCategory = getByLabelText("Product Category");
    const inputImage = getByLabelText("Product Image");
    const inputFreshness = getByLabelText("Freshness");
    const inputDescription = getByLabelText("Description Product");
    const inputPrice = getByLabelText("Price Product");
    act(() => {
      // user click submit
      fireEvent.change(input, { target: { value: "" } });
      fireEvent.change(inputCategory, { target: { value: '' } });
      fireEvent.input(inputImage, { target: { value: '' } });
      fireEvent.change(inputFreshness, { target: { value: '' } });
      fireEvent.change(inputDescription, { target: { value: '' } });
      fireEvent.change(inputPrice, { target: { value: '' } });
      fireEvent.submit(form);
    });
    await waitFor(() => {
      expect(getByTestId("errors")).toHaveTextContent(`name is a required field`);
      expect(getByTestId("errorCategory")).toHaveTextContent(`category is a required field`);
      expect(getByTestId("errorImage")).toHaveTextContent(`image is a required field`);
      expect(getByTestId("errorFreshness")).toHaveTextContent(`freshness is a required field`);
      expect(getByTestId("errorDescription")).toHaveTextContent(`description is a required field`);
      expect(getByTestId("errorPrice")).toHaveTextContent(`price is a required field`);

    });
  });
});
