//Imports;
import axios from "axios";
import { NextResponse } from "next/server";

//Route;
const url = process.env.BASE_URL + "/clients";

//GET Function;
export async function GET(request, { params }) {
    const { id } = params;

    try{
        const response = await axios.get(`${url}/${id}`);
        return NextResponse.json(response.data);
    }catch (error){
        console.log("[ORDER_GET]", error);
        return new NextResponse("Erro interno do servidor!", { status: 500});
    }
}

//PUT Function;
export async function PUT(request, { params }){
    const { id } = params;
    const body = await request.json();

    try{
        const response = await axios.put(`${url}/${id}`, body);
        return NextResponse.json(response.data);
    }catch (error){
        console.log("[ORDER_GET]", error);
        return new NextResponse("Erro interno do servidor!", { status: 500});
    }
}

//DELETE Function;
export async function DELETE(request, { params }) {
    const { id } = params;
    try{
        const response = await axios.delete(`${url}/${id}`);
        return NextResponse.json(response.data);
    } catch (error){
        console.log("[ORDER_GET]", error);
        return new NextResponse("Erro interno do servidor!", { status: 500});
    }
}