<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StudyProgram;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudyProgramController extends Controller
{
    public function index()
    {
        $programs = StudyProgram::latest()->paginate(20);

        return Inertia::render('Admin/StudyPrograms/Index', [
            'programs' => $programs,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/StudyPrograms/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|unique:study_programs',
            'name' => 'required',
            'faculty' => 'required',
            'level' => 'required|in:S1,S2,S3,Profesi,Spesialis',
            'class_type' => 'required|in:Regular,International,Extension',
            'tuition_fee' => 'required|numeric',
            'quota' => 'required|integer',
        ]);

        StudyProgram::create($request->all());

        return redirect()->route('admin.study-programs.index')
            ->with('success', 'Program studi berhasil ditambahkan!');
    }

    public function show(StudyProgram $studyProgram)
    {
        return Inertia::render('Admin/StudyPrograms/Show', [
            'program' => $studyProgram,
        ]);
    }

    public function edit(StudyProgram $studyProgram)
    {
        return Inertia::render('Admin/StudyPrograms/Edit', [
            'program' => $studyProgram,
        ]);
    }

    public function update(Request $request, StudyProgram $studyProgram)
    {
        $request->validate([
            'code' => 'required|unique:study_programs,code,' . $studyProgram->id,
            'name' => 'required',
            'faculty' => 'required',
            'level' => 'required|in:S1,S2,S3,Profesi,Spesialis',
            'class_type' => 'required|in:Regular,International,Extension',
            'tuition_fee' => 'required|numeric',
            'quota' => 'required|integer',
        ]);

        $studyProgram->update($request->all());

        return redirect()->route('admin.study-programs.index')
            ->with('success', 'Program studi berhasil diupdate!');
    }

    public function destroy(StudyProgram $studyProgram)
    {
        $studyProgram->delete();

        return redirect()->route('admin.study-programs.index')
            ->with('success', 'Program studi berhasil dihapus!');
    }
}