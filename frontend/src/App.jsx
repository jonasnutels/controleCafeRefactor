import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserStorage } from './userContext';
import './App.css';
import Home from './components/Home';
import Cadastro from './components/Pages/Cadastro';
import ListaControle from './components/Dashboard/listaControle';
import ProtectedRoute from './Helper/ProtectedRoute';
import NotFound from './Helper/NotFound';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import { Container } from '@mui/material';
import RegistroCompra from './components/Dashboard/RegistroCompra';
import MudarSenha from './components/Pages/MudarSenha';
export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Container fixed maxWidth="xl">
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cadastrar" element={<Cadastro />} />

                <Route
                  path="/change-password"
                  element={
                    <ProtectedRoute>
                      <MudarSenha />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="lista"
                  element={
                    <ProtectedRoute>
                      <ListaControle />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="registrar-compra"
                  element={
                    <ProtectedRoute>
                      <RegistroCompra />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Container>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}
